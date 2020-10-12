import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Bitstream } from '../../core/shared/bitstream.model';
import { createSuccessfulRemoteDataObject$ } from '../../shared/remote-data.utils';
import { createPaginatedList } from '../../shared/testing/utils.test';
import { of as observableOf } from 'rxjs';
import { By } from '@angular/platform-browser';
import { MediaViewerComponent } from './media-viewer.component';
import { MockBitstreamFormat1 } from '../../shared/mocks/item.mock';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateLoaderMock } from '../../shared/mocks/translate-loader.mock';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BitstreamDataService } from '../../core/data/bitstream-data.service';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { MediaViewerItem } from '../../core/shared/media-viewer-item.model';
import { VarDirective } from '../../shared/utils/var.directive';
import { MetadataFieldWrapperComponent } from '../field-components/metadata-field-wrapper/metadata-field-wrapper.component';
import { FileSizePipe } from '../../shared/utils/file-size-pipe';
import { BitstreamFormat } from '../../core/shared/bitstream-format.model';
import { BitstreamFormatDataService } from '../../core/data/bitstream-format-data.service';

fdescribe('MediaViewerComponent', () => {
  let comp: MediaViewerComponent;
  let fixture: ComponentFixture<MediaViewerComponent>;

  const bitstreamDataService = jasmine.createSpyObj('bitstreamDataService', {
    findAllByItemAndBundleName: createSuccessfulRemoteDataObject$(
      createPaginatedList([])
    ),
  });

  const bitstreamFormatDataService = jasmine.createSpyObj(
    'bitstreamFormatDataService',
    {
      findByBitstream: createSuccessfulRemoteDataObject$(new BitstreamFormat()),
    }
  );

  const mockBitstream: Bitstream = Object.assign(new Bitstream(), {
    sizeBytes: 10201,
    content:
      'https://dspace7.4science.it/dspace-spring-rest/api/core/bitstreams/cf9b0c8e-a1eb-4b65-afd0-567366448713/content',
    format: observableOf(MockBitstreamFormat1),
    bundleName: 'ORIGINAL',
    _links: {
      self: {
        href:
          'https://dspace7.4science.it/dspace-spring-rest/api/core/bitstreams/cf9b0c8e-a1eb-4b65-afd0-567366448713',
      },
      content: {
        href:
          'https://dspace7.4science.it/dspace-spring-rest/api/core/bitstreams/cf9b0c8e-a1eb-4b65-afd0-567366448713/content',
      },
    },
    id: 'cf9b0c8e-a1eb-4b65-afd0-567366448713',
    uuid: 'cf9b0c8e-a1eb-4b65-afd0-567366448713',
    type: 'bitstream',
    metadata: {
      'dc.title': [
        {
          language: null,
          value: 'test_word.docx',
        },
      ],
    },
  });

  const mockMediaViewerItem: MediaViewerItem = Object.assign(
    new MediaViewerItem(),
    { bitstream: mockBitstream, format: 'image', thumbnail: null }
  );

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        TranslateModule.forRoot({
          loader: {
            provide: TranslateLoader,
            useClass: TranslateLoaderMock,
          },
        }),
        BrowserAnimationsModule,
      ],
      declarations: [
        MediaViewerComponent,
        VarDirective,
        FileSizePipe,
        MetadataFieldWrapperComponent,
      ],
      providers: [
        { provide: BitstreamDataService, useValue: bitstreamDataService },
        {
          provide: BitstreamFormatDataService,
          useValue: bitstreamFormatDataService,
        },
      ],

      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MediaViewerComponent);
    comp = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('when the bitstreams are loading', () => {
    beforeEach(() => {
      comp.mediaList$.next([mockMediaViewerItem]);
      comp.isLoading = true;
      fixture.detectChanges();
    });

    it('should call the service to retrieve bitstreams', () => {
      expect(
        bitstreamDataService.findAllByItemAndBundleName
      ).toHaveBeenCalled();
    });

    it('should display a loading component', () => {
      const loading = fixture.debugElement.query(By.css('ds-loading'));
      expect(loading.nativeElement).toBeDefined();
    });
  });
});
